import { expect, test, describe, vi, Mocked } from 'vitest'
import { testFn, request } from './utils'
import axios from 'axios';

// mock 掉真实的 axios 请求
vi.mock('axios');
// 类型断言：告诉 TS 这是个 mock 的 axios
const mockedAxios = axios as Mocked<typeof axios>

test('test common matcher', () => {
  const name = 'viking';
  expect(name).toBe('viking');
  expect(2 + 2).not.toBe(5);
})

test('test to be true or false', () => {
  expect(1).toBeTruthy();
  expect(0).toBeFalsy();
})

test('test number', () => {
  expect(4).toBeGreaterThan(3);
  expect(2).toBeLessThan(3);
})

test('test object', () => {
  //toBe是严格相等，toEqual是值相等
  //expect({name:'viking'}).toBe({name:'viking'})
  expect({ name: 'viking' }).toEqual({ name: 'viking' })
})

describe('function', () => {
  //函数是否被调用、用的参数
  test('creat a mock function', () => {
    // 创建一个“假的”函数（Mock 函数）
    const callback = vi.fn();
    testFn(12, callback);
    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledWith(12);
  })
  //调用了几次、什么时候调用
  test('spy on method', () => {
    const obj = {
      getName: () => 1
    }
    // 监听 obj.getName 的调用情况
    const spy = vi.spyOn(obj, 'getName');
    obj.getName();
    expect(spy).toHaveBeenCalled();
    obj.getName();
    expect(spy).toHaveBeenCalledTimes(2);
  })
  // 控制请求返回值，不依赖网络
  test('mock third party module', async () => {
    // 假装 axios.get 返回 {data:123}
    mockedAxios.get.mockImplementation(() => Promise.resolve({ data: 123 }));
    mockedAxios.get.mockResolvedValue({ data: 123 });
    // 执行你写的 request 函数
    const result = await request();
    expect(result).toBe(123);
  })
})
