1. 用户按下方向键：→
   => direction = "ArrowRight"

2. setTimeout 每 300ms 调一次 run():
   => X += 10 （往右）
   => snake.X = X （触发 Snake 类的 setter）

3. setter 检查是否掉头、是否撞墙
   => 没撞 => 正常移动 => 改变 snake.head 的位置

4. 继续 setTimeout(run, xxx)
   => 下一次重复以上步骤
   
Snake 类的 setter 只管“这一帧”怎么走，是否撞墙、是否掉头。
连续不断地走，是 GameControl 类里的 run() 通过 setTimeout 不停地触发造成的。
