AFRAME.registerComponent('bullet', {
  init: function () {
    this.bullets = [];
    this.translation = new THREE.Vector3();
    this.shoot = this.shoot.bind(this);
    for (var i = 0; i < 20; ++i) {
      var bullet = {
        time: 0,
        from: new THREE.Vector3(),
        to: new THREE.Vector3(),
        el: document.createElement('a-entity')
      };
      this.bullets.push(bullet);
      bullet.el.setAttribute('mixin', 'bullet');
      bullet.el.object3D.visible = false;
      this.el.sceneEl.appendChild(bullet.el);
    }
    document.addEventListener('click', this.shoot);
  },
  
  shoot: function () {
    var camera = this.el.object3D;  
    
    var bullet;
    for (var i = 0; i < this.bullets.length; ++i) {
      bullet = this.bullets[i];
      if (bullet.el.object3D.visible === false) {
        bullet.time = 0;
        bullet.to.setFromMatrixPosition(camera.matrixWorld);
        bullet.from.copy(0, 1.6, -2);
        bullet.el.object3D.visible = true;
        bullet.el.object3D.position.copy(bullet.from);
        break;
      }
    }
  },
  
  tick: function (time, delta) {
    var bullet;
    for (var i = 0; i < this.bullets.length; ++i) {
      if (bullet.el.object3D.visible === false) { continue; }
      bullet = this.bullets[i];
      bullet.time += delta;
      this.translation.copy(bullet.direction).multiplyScalar(bullet.time / 2500);
      bullet.el.object3D.position.copy(bullet.from).add(this.translation);
      if (bullet.time > 3000) { bullet.el.object3D.visible = false; }
    }
  }
});