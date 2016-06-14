function Touch(dom){
  if(dom == null || typeof dom !== 'object') throw new Error('dom is invalid')
  this.dom = dom
  this.startX = 0
  this.startY = 0
  this.endX = 0
  this.endY = 0
  this.actions = ['pan']
  this.effectiveDistance = 10
  this.callbacks = {
    panFn: null,
  }
}

Touch.prototype = {
  on: function(action, cb){
    if(typeof action !== 'string' || typeof cb !== 'function') 
      throw new Error('"on" method params is invalid')
    this.verifyAction(action)
    this.setCallbacks(action, cb)
    this.dom.addEventListener('touchstart', e => this.onTouchstart(e), false)
    this.dom.addEventListener('touchend', e => this.onTouchend(e), false)
  },

  onTouchstart: function(e){
    this.startY = e.changedTouches[0].pageY
    this.startX = e.changedTouches[0].pageX
  },

  onTouchend: function(e){
    this.endX = e.changedTouches[0].pageX
    this.endY = e.changedTouches[0].pageY
    const distanceY = this.endY - this.startY
    const distanceX = this.endX - this.startX
    this.handlePanCb(distanceX, distanceY)
  },

  handlePanCb(distanceX, distanceY){
    if(this.callbacks.panFn == null) return
    // vertical direction 
    if(Math.abs(distanceY) > this.effectiveDistance && Math.abs(distanceY) >= Math.abs(distanceX)){
      this.callbacks.panFn({type: distanceY < 0 ? 'panup' : 'pandown'})
    }else if(Math.abs(distanceX) > this.effectiveDistance && Math.abs(distanceX) > Math.abs(distanceY)){// horizontal direction
      this.callbacks.panFn({type: distanceX < 0 ? 'panleft' : 'panright'})
    }
  },

  setCallbacks(action, cb){
    switch(action){
      case 'pan':
        this.callbacks.panFn = cb 
        break
    }
  },

  verifyAction: function(action){
    if(this.actions.indexOf(action) < 0) 
      throw new Error(`not exists "${action}" action, only support "${this.actions.join(',')}" at present.`)
  },

}

module.exports = Touch