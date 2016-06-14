# easy-touch
a light weight javascript gestures library

# Usage
1.

```
npm install --save easy-touch
```
or 
```html 
<script type="text/javascript" src='./dist/easy-touch.min.js'></script>
```

2.

```js 
const touch = new Touch(window)
touch.on('pan', e => {
  if(e.type === 'panleft') console.log('finger is move to left')
})
```

# API
## on
**on(str action, fn callback) 监听 action 动作**

`action` 目前支持：

 `pan` （滑动） 

`callback` 需要一个参数 e，e 参数会有个 `type` 属性：

`pan` ：`panleft`, `panright`, `panup`, `pandown`