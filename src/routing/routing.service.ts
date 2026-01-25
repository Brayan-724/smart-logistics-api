import { Injectable } from '@nestjs/common';
import { OptimizeRouteDto } from './dto/optimize-route.dto';
import { Edge } from 'src/networks/types/edge';

@Injectable()
export class RoutingService {
  /**
   * Calculate the optimal path using Dijkstra's algorithm.
   * @param edges The edges of the graph.
   * @param optimizeRouteDto The optimization parameters.
   * @returns The optimal path and its total cost.
   */
  calculatePath(edges: Edge[], optimizeRouteDto: OptimizeRouteDto) {
    const { originNodeId, destinationNodeId, preference } = optimizeRouteDto;

    const graph = this.calculateGraph(edges, preference);

    const costs = new Map<string, number>();
    const previous = new Map<string, string>();
    const queue: { node: string; cost: number }[] = [];

    costs.set(originNodeId, 0);
    this.insertIntoQueue(queue, { node: originNodeId, cost: 0 });

    while (queue.length > 0) {
      const current = queue.shift();
      if (!current) continue;

      const { node: currentNode, cost: currentCost } = current;

      if (currentNode === destinationNodeId) {
        const path: string[] = [];
        let temp: string | undefined = destinationNodeId;
        while (temp) {
          path.unshift(temp);
          temp = previous.get(temp);
        }
        return { totalCost: currentCost, path };
      }

      if (graph.has(currentNode)) {
        const neighbors = graph.get(currentNode);
        if (neighbors) {
          for (const neighbor of neighbors) {
            const newCost = currentCost + neighbor.cost;
            if (
              !costs.has(neighbor.node) ||
              newCost < (costs.get(neighbor.node) ?? Infinity)
            ) {
              costs.set(neighbor.node, newCost);
              previous.set(neighbor.node, currentNode);
              this.insertIntoQueue(queue, {
                node: neighbor.node,
                cost: newCost,
              });
            }
          }
        }
      }
    }

    return { totalCost: -1, path: [] };
  }

  /**
   * Insert an item into the queue while maintaining the sorted order based on cost.
   * @param queue The queue to insert the item into.
   * @param item The item to insert.
   */
  private insertIntoQueue(
    queue: { node: string; cost: number }[],
    item: { node: string; cost: number },
  ) {
    let low = 0;
    let high = queue.length;

    while (low < high) {
      const mid = (low + high) >>> 1;
      if (queue[mid].cost < item.cost) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }
    queue.splice(low, 0, item);
  }

  calculateGraph(edges: Edge[], preference?: string) {
    const graph = new Map<string, { node: string; cost: number }[]>();

    for (const edge of edges) {
      if (!graph.has(edge.from)) {
        graph.set(edge.from, []);
      }
      const weight = preference === 'shortest' ? 1 : edge.cost;
      graph.get(edge.from)?.push({ node: edge.to, cost: weight });
    }

    return graph;
  }
}
