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

作者：尹光耀
链接：https://juejin.im/post/5c8f30606fb9a070ef60996d
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。