

# 设计模式 Design Patterns [dɪˈzaɪn] ['pætənz]

使用 ES6 实现 23 种经典设计模式 (GoF)。 


示例原则：

* 极简 Minimalism [ˈmɪnɪməlɪzəm]
* 抽象 Abstract [ˈæbstrækt]


![Design Patterns](./design-patterns.svg)

### 📗 创建模式 Creational Patterns [kri:ˈeiʃənəl] ['pætənz]

#### 单例模式 Singleton [ˈsɪŋɡltən] 

保证一个类仅有一个实例。 

``` javascript
// static
class Singleton {
  constructor(name) {
    this.name = name;
    this.instance = null;
  }

  static create(name) {
    if (!this.instance) this.instance = new Singleton(name);
    return this.instance;
  }
}
```

``` javascript
// constructor
class Singleton {
  constructor(name) {
    if (typeof Singleton.instance === 'object') {
      return Singleton.instance;
    }
    Singleton.instance = this;

    this.name = name;
  }
}
```

``` javascript
// proxy
class Instance {
  constructor(name) {
    this.name = name;
  }
}
class Singleton {
  constructor(name) {
    if (!Singleton.instance) {
      Singleton.instance = new Instance(name);
    }
    return Singleton.instance;
  }
}
```

#### 工厂模式 Factory [ˈfæktri] 

让其子类自己决定实例化哪一个工厂类。 

``` javascript
class A {
  constructor() {
    this.name = 'A';
  }
}

class B {
  constructor() {
    this.name = 'B';
  }
}

class C {
  constructor() {
    this.name = 'C';
  }
}

class Factory {
  static create(product) {
    switch (product.toUpperCase()) {
      case 'A': return new A();
      case 'B': return new B();
      case 'C': return new C();
      default:
        throw new Error('no class');
    }
  }
}
```

#### 抽象工厂模式 Abstract Factory [ˈæbstrækt] [ˈfæktri] 

创建一系列相关或相互依赖对象的接口，而无需指定它们具体的类。 

``` javascript
class A1 {
  constructor() {
    this.name = 'A1';
  }
}
class A2 {
  constructor() {
    this.name = 'A2';
  }
}
class B1 {
  constructor() {
    this.name = 'B1';
  }
}
class B2 {
  constructor() {
    this.name = 'B2';
  }
}
class FactoryA {
  static create(product) {
    switch (product.toUpperCase()) {
      case 'A1':
        return new A1();
      case 'A2':
        return new A2();
      default:
        throw new Error('no product');
    }
  }
}
class FactoryB {
  static create(product) {
    switch (product.toUpperCase()) {
      case 'B1':
        return new B1();
      case 'B2':
        return new B2();
      default:
        throw new Error('no product');
    }
  }
}

class AbstractFactory {
  static create(factory) {
    switch (factory.toUpperCase()) {
      case 'A':
        return FactoryA;
      case 'B':
        return FactoryB;
      default:
        throw new Error('no factory');
    }
  }
}
```

#### 建造者模式 Builder [ˈbɪldə(r)] 

使用多个简单的对象一步一步构建成一个复杂的对象。 

``` javascript
class A {
  constructor() {
    this.name = 'A';
  }
}

class B {
  constructor() {
    this.name = 'B';
  }
}

class Builder {
  constructor() {
    this.a = new A();
    this.b = new B();
  }
}
```

#### 原型模式 Prototype [ˈprəʊtətaɪp] 

用原型实例指定创建对象的种类，并且通过拷贝这些原型创建新的对象。 

``` javascript
class Prototype {
  constructor(name) {
    this.name = name;
  }

  clone() {
    return new Prototype(this.name);
  }
}
```

### 📘 结构模式 Structural Patterns [ˈstrʌktʃərəl] ['pætənz]

#### 适配器模式 Adapter [ə'dæptə] 

将一个类的接口转换成另外一个需要的接口，作为两个不兼容的接口之间的桥梁。 

``` javascript
class Standard {
  execute() {
    return false;
  }
}

class Instance {
  action() {
    return true;
  }
}
class Adapter {
  static adapter(instance) {
    instance.execute = instance.action;
  }
}
```

#### 桥接模式 Bridge [brɪdʒ] 

将抽象部分与实现部分分离，使它们都可以独立的变化。 

``` javascript
class Bridge {
  execute(value) {
    return value;
  }
}

class Instance {
  constructor(value, bridge) {
    this.value = value;
    this.bridge = bridge;
  }

  execute() {
    return this.bridge.execute(this.value);
  }
}
```

#### 组合模式 Composite [ˈkɒmpəzɪt] 

将对象组合成树形结构以表示"部分-整体"的层次结构。 

``` javascript
class Instance {
  constructor(value) {
    this.value = value;
    this.children = [];
  }

  add(instance) {
    this.children.push(instance);
  }

  toString() {
    return this.value.toString() + this.children.map((child) => child.toString()).join('');
  }
}
```

#### 装饰模式 Decorator [ˈdekəreɪtə(r)] 

动态添加/覆盖对象现有对象中的行为。 

``` javascript
class Original {
  constructor(value) {
    this.value = value;
  }

  execute() {
    return this.value;
  }
}

class Decorator extends Original {
  superExecute() {
    return this.value * 2;
  }
}
```

#### 外观模式 Facade [fəˈsɑːd] 

定义了一个高层接口，这个接口使得这一子系统更加容易使用。 

``` javascript
class A {
  execute() {
    return 'A';
  }
}

class B {
  execute() {
    return 'B';
  }
}

class C {
  execute() {
    return 'C';
  }
}

class Facade {
  constructor() {
    this.a = new A();
    this.b = new B();
    this.c = new C();
  }

  executeA() {
    return this.a.execute();
  }

  executeB() {
    return this.b.execute();
  }

  executeC() {
    return this.c.execute();
  }
}
```

#### 享元模式 Flyweight [ˈflaɪweɪt] 

运用共享技术有效地支持大量细粒度的对象。 

``` javascript
class Flyweight {
  constructor(value) {
    this.value = value;
  }
}

class Instance {
  constructor() {
    this.items = [];
  }

  create(value) {
    this.items.push(new Flyweight(value));
    return this;
  }
}
```

#### 代理模式 Proxy [ˈprɒksi] 

为其他对象提供一种代理以控制对这个对象的访问。 

``` javascript
class Instance {
  constructor() {
    this.value = true;
  }
}

class Proxy {
  constructor() {
    return new Instance();
  }
}
```

### 📙 行为模式 Behavioral Patterns [bi'heivjərəl] ['pætənz]

#### 职责链模式 Chain Of Responsibility [tʃeɪn] [əv] [rɪˌspɒnsəˈbɪləti] 

将多个对象连接成一条链，沿着这条链传递请求，并处理该请求。 

``` javascript
```

#### 命令模式 Command [kəˈmɑːnd] 

将一个请求封装成一个对象，从而使您可以用不同的请求对实例进行参数化。 

``` javascript
```

#### 解释器模式 Interpreter [ɪnˈtɜːprətə(r)] 

实现了一个表达式接口，该接口解释一个特定的上下文。 

``` javascript
```

#### 迭代器模式 Iterator [ɪtə'reɪtə] 

提供一种方法顺序访问一个聚合对象中各个元素, 而又无须暴露该对象的内部表示。 

``` javascript
```

#### 中介者模式 Mediator [ˈmiːdieɪtə(r)] 

提供了一个中介类处理不同类之间的通信，从而使其耦合松散。 

``` javascript
```

#### 备忘录模式 Memento [məˈmentəʊ] 

保存一个对象的某个状态，以便在适当的时候恢复对象。 

``` javascript
```

#### 观察者模式 Observer [əbˈzɜːvə(r)] 

当一个对象被修改时，则会自动通知依赖它的对象。 

``` javascript
```

#### 状态模式 State [steɪt] 

允许对象在内部状态发生改变时改变它的行为。 

``` javascript
```

#### 策略模式 Strategy [ˈstrætədʒi]

定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换。 

``` javascript
```

#### 模板模式 Template [ˈtempleɪt] 

定义一个抽象类实现方法的框架，从而允许其子类实现具体的行为。 

``` javascript
```

#### 访问者模式 Visitor [ˈvɪzɪtə(r)] 

通过将方法的层次结构移动到一个对象中，将算法与对象结构分离。 

``` javascript
```
