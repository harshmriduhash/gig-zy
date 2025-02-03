interface QueueItem<T> {
  priority: number;
  timestamp: number;
  data: T;
}

export function usePriorityQueue<T>() {
  const queue: QueueItem<T>[] = [];

  const enqueue = (item: T, priority: number) => {
    const queueItem: QueueItem<T> = {
      priority,
      timestamp: Date.now(),
      data: item
    };

    // Find position to insert based on priority and timestamp
    let index = queue.findIndex(existing => 
      existing.priority < priority || 
      (existing.priority === priority && existing.timestamp > queueItem.timestamp)
    );

    if (index === -1) {
      queue.push(queueItem);
    } else {
      queue.splice(index, 0, queueItem);
    }
  };

  const dequeue = (): T | null => {
    const item = queue.shift();
    return item ? item.data : null;
  };

  const peek = (): T | null => {
    return queue[0]?.data || null;
  };

  const clear = () => {
    queue.length = 0;
  };

  const size = () => queue.length;

  const isEmpty = () => queue.length === 0;

  return {
    enqueue,
    dequeue,
    peek,
    clear,
    size,
    isEmpty
  };
}