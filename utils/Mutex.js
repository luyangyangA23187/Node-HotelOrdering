class Mutex{
    constructor(){
        this.lock = false
    }

    //上锁
    setLock = async()=>{
        while(this.lock){
            await this.wait(500)
        }   
        this.lock = true
    }

    //解锁
    unLock = ()=>{
        this.lock = false
    }

    //等待
    wait = (delay)=>{
        return new Promise((resolve)=>{
            setTimeout(()=>{resolve()},delay)
        })
    }
}

const mutex = new Mutex()

module.exports = mutex