import Engine from '../src/index';

describe('流程引擎条件计算', () => {
  test('边edge1的条件不满足, 边edge2的条件满足', async () => {
    const engine = new Engine();
    const flowData = {
      graphData: {
        nodes: [
          {
            id: 'node1',
            type: 'StartNode',
            properties: {
            }
          },
          {
            id: 'node2',
            type: 'TaskNode',
            properties: {}
          },
          {
            id: 'node3',
            type: 'TaskNode',
            properties: {}
          }
        ],
        edges: [
          {
            id: 'edge1',
            sourceNodeId: 'node1',
            targetNodeId: 'node2',
            properties: {
              conditionExpression: 'a === 1'
            }
          },
          {
            id: 'edge2',
            sourceNodeId: 'node1',
            targetNodeId: 'node3',
            properties: {
              conditionExpression: 'a === 2'
            }
          }
        ]
      },
      globalData: {
        a: 2
      },
    }
    engine.load(flowData);
    const result = await engine.execute();
    const execution = await engine.getExecutionRecord(result.executionId);
    expect(execution.length).toBe(2);
    expect(execution[1].nodeId).toBe('node3');
    expect(execution[1].nodeType).toBe('TaskNode');
  });
});