document.getElementById('runAlgorithm').addEventListener('click', function() {
    const graph = {
        A: { B: 5, C: 3 },
        B: { A: 5, C: 2, D: 1 },
        C: { A: 3, B: 2, D: 4, E: 6 },
        D: { B: 1, C: 4, E: 8 },
        E: { C: 6, D: 8 }
    };

    const startVertex = 'A';
    const distances = dijkstra(graph, startVertex);

    const resultElement = document.getElementById('result');
    resultElement.textContent = JSON.stringify(distances);
});

function dijkstra(graph, start) {
    const distances = {};
    const visited = {};
    const queue = [];

    for (let vertex in graph) {
        distances[vertex] = Infinity;
    }

    distances[start] = 0;

    while (Object.keys(visited).length !== Object.keys(graph).length) {
        let minVertex = null;
        for (let vertex in distances) {
            if (!visited[vertex] && (minVertex === null || distances[vertex] < distances[minVertex])) {
                minVertex = vertex;
            }
        }

        visited[minVertex] = true;
        queue.push(minVertex);

        for (let neighbor in graph[minVertex]) {
            const distance = distances[minVertex] + graph[minVertex][neighbor];
            if (distance < distances[neighbor]) {
                distances[neighbor] = distance;
            }
        }
    }

    return distances;
}
