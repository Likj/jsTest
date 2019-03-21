const defer = sec => new Promise(resolve => setTimeout(resolve, sec * 1000));

function machine(name) {
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
    return this;
  }

  function wait(sec) {
    const task = async () => {
      console.log(`wait ${sec}s`);
      await defer(sec);
    };
    tasks.push(task);
    return this;
  }

  function waitFirst(sec) {
    const task = async () => {
      console.log(`wait ${sec}s`);
      await defer(sec);
    };

    tasks.unshift(task);
    return this;
  }

  function execute() {
    tasks.reduce(async (promise, task) => {
      await promise;
      await task();
    }, Promise.resolve);
  }

  return {
    do: _do,
    wait,
    waitFirst,
    execute,
  };
}