// 引入其他的类
import Snake from "./Snake";
import ScorePanel from "./ScorePanel";
import Food from "./Food";

// 游戏控制器，控制其他的所有类
class GameControl {
  // 定义三个属性
  // 蛇
  snake: Snake;
  // 食物
  food: Food;
  // 记分牌
  scorePanel: ScorePanel;

  // 创建一个属性来存储蛇的移动方向（也就是按键的方向）
  direction: string = "";
  // 创建一个属性用来记录游戏是否结束
  isLive = true;

  constructor() {
    this.snake = new Snake();
    this.food = new Food();
    this.scorePanel = new ScorePanel();

    this.init();
  }

  // 游戏的初始化方法，调用后游戏即开始
  init() {
    // 绑定键盘按键按下的事件
    document.addEventListener("keydown", this.keydownHandler.bind(this));
    // 调用 run 方法，使蛇移动
    this.run();
  }

  // 创建一个键盘按下的事件
  keydownHandler(event: KeyboardEvent) {
    // 需要检查 event.key 的值是否合法（用户是否按了正确的按钮）

    // 修改 direction 属性
    this.direction = event.key;
  }

  // 创建一个控制蛇移动的方法
  run() {
    // 获取蛇现在的坐标
    let X = this.snake.X;
    let Y = this.snake.Y;

    // 根据按键方向修改 X 值和 Y 值
    switch (this.direction) {
      case "ArrowUp":
      case "Up":
        // 向上移动 top 减少
        Y -= 10;
        break;
      case "ArrowDown":
      case "Down":
        // 向下移动 top 增加
        Y += 10;
        break;
      case "ArrowLeft":
      case "Left":
        // 向左移动 left 减少
        X -= 10;
        break;
      case "ArrowRight":
      case "Right":
        // 向上移动 Right 增加
        X += 10;
        break;
    }

    // 检查蛇是否吃到了食物
    this.checkEat(X, Y);

    // 修改蛇的 X 和 Y 值
    try {
      this.snake.X = X;
      this.snake.Y = Y;
    } catch (e: any) {
      // 进入到 catch，说明出现了异常，游戏结束，弹出一个提示信息
      alert(e.message + "GAME OVER");
      // 将 isLive 设置为 false
      this.isLive = false;
    }

    // 开启一个定时调用
    this.isLive &&
      setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30);
  }

  // 定义一个方法，用来检查蛇是否吃到食物
  checkEat(X: number, Y: number) {
    if (X === this.food.X && Y === this.food.Y) {
      // 食物的位置要进行重置
      this.food.change();
      // 分数增加
      this.scorePanel.addScore();
      // 蛇增加一节
      this.snake.addBody();
    }
  }
}

export default GameControl;
