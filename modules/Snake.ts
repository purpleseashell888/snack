class Snake {
  // 表示蛇头的元素
  head: HTMLElement;
  // 蛇的身体（包括蛇头）
  bodies: HTMLCollection;
  // 获取蛇的容器
  element: HTMLElement;

  constructor() {
    this.element = document.getElementById("snake")!;
    this.head = document.querySelector("#snake > div") as HTMLElement;
    // getElementsByTagName 返回的是 collection 可以改变数量；querySelectorAll 返回的是 NodeList 不可改变数量
    this.bodies = this.element.getElementsByTagName("div");
  }

  // 获取蛇的坐标（蛇头坐标）
  get X() {
    return this.head.offsetLeft;
  }
  // 获取蛇的 Y 轴坐标
  get Y() {
    return this.head.offsetTop;
  }

  // 设置蛇头的坐标
  set X(value: number) {
    // 如果新值和旧值相同，则直接返回不再修改
    if (this.X === value) {
      return;
    }

    // X 的值合法范围 0-290 之间
    if (value < 0 || value > 290) {
      // 进入判断说明蛇撞墙了
      throw new Error("蛇撞墙了！");
    }

    this.head.style.left = value + "px";
  }

  set Y(value: number) {
    // 如果新值和旧值相同，则直接返回不再修改
    if (this.Y === value) {
      return;
    }

    // Y 的值合法范围 0-290 之间
    if (value < 0 || value > 290) {
      // 进入判断说明蛇撞墙了
      throw new Error("蛇撞墙了！");
    }

    this.head.style.top = value + "px";
  }

  // 蛇增加身体的方法
  addBody() {
    // 向 element 中添加一个 div
    this.element.insertAdjacentHTML("beforeend", "<div></div>");
  }
}

export default Snake;
