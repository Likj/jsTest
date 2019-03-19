function machine() {
    
}
machine('ygy').execute() 
// start ygy
machine('ygy').do('eat').execute(); 
// start ygy
// ygy eat
machine('ygy').wait(5).do('eat').execute();
// start ygy
// wait 5s（这里等待了5s）
// ygy eat
machine('ygy').waitFirst(5).do('eat').execute();
// wait 5s
// start ygy
// ygy eat

function machine(name) {
 return new Action(name);   
}
function asyncFn(fn, wait) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
          resolve(fn());
      }, wait * 1000)  
    });
}
class QueueItem{
    constructor(callback, defer) {
        this.defer = defer;
        this.callback = callback;
    }
}

class Action{
    queueArr = []
    constructor(name) {
        this.base = name;
        this.queueArr.push(new QueueItem(function() {
        
            console.log('start   ' + name);
        }));
    }
    async execute() {
        while(this.queueArr.length > 0) {
            let queue = this.queueArr.shift();
            if (!queue.defer) {
                queue.callback();
                continue;
            }
            await asyncFn(queue.callback, queue.defer);
        }    
    }
    do(result) {
        let base = this.base;
        this.queueArr.push(new QueueItem(function() {
            console.log(base, result);
        }));
        return this;
    }
    wait(wati) {
        this.queueArr.push(new QueueItem(function() {
            console.log('wait', wati)
        }, wati));
        return this;
    }
    waitFirst(wait) {
        let outerVar = '外面的变亮'
        this.queueArr.unshift(new QueueItem( function() {
            console.log('函数执行战' + outerVar);
            console.log('first fn wait', wait);
        } , wait));
        return this
    }
}
