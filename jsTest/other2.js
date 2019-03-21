const defer = sec => new Promise(resolve => setTimeout(resolve, sec * 1000));

function machine(name) {
  const context = {};
  const tasks = [];
  const initTask = () => {
    console.log(`start ${name}`);
  };
  tasks.push(initTask);

  function _do(str) {
    const task = () => {
      console.log(`${name} ${str}`);
    };
    tasks.push(task);
    return context;
  }

  function wait(sec) {
    const task = async () => {
      console.log(`wait ${sec}s`);
      await defer(sec);
    };
    tasks.push(task);
    return context;
  }

  function waitFirst(sec) {
    const task = async () => {
      console.log(`wait ${sec}s`);
      await defer(sec);
    };

    tasks.unshift(task);
    return context;
  }

  function execute() {
    tasks.reduce(async (promise, task) => {
      await promise;
      await task();
    }, Promise.resolve);
  }

  // 用 Object.freeze 来防止调用者修改内部函数，保障安全
  return Object.freeze(
    Object.assign(context, {
      do: _do,
      wait,
      waitFirst,
      execute,
    })
  );
}

// 作者：serialcoder
// 链接：https://juejin.im/post/5c92dfe7f265da60d428f119
// 来源：掘金
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。