
AFRAME.registerComponent('measurement-scale', {
        init: function(){
          let data = this.data;
          let el = this.el;
          let child = this.el.children[0];
          
          let width = child.getAttribute('scale').x;
          let height = child.getAttribute('scale').y;
          let depth = child.getAttribute('scale').z;
          
          let measurements = document.createElement('a-entity');
          
          let margin = 0.2;
          let color = 'black';
          let lineThickness = 0.02;
          let fontSize = 5;
          let fontPadding = 0.1;
          
          //HEIGHT
          
          let lineHeight = document.createElement('a-entity');
          lineHeight.setAttribute('geometry', {
            primitive: 'plane',
            height: height,
            width: lineThickness,
          });
          lineHeight.setAttribute('material', {
            color: color,
          })
          lineHeight.setAttribute('position', {x: width/2 + margin, y: 0, z: depth/2});
          
          lineHeight.setAttribute('text', {
            value: height + ' m',
            align: 'left',
            anchor: 'left',
            xOffset: fontPadding,
            width: fontSize,
            color: color,
          })
          
          //WIDTH
          
          let lineWidth = document.createElement('a-entity');
          lineWidth.setAttribute('geometry', {
            primitive: 'plane',
            height: width,
            width: lineThickness,
          });
          lineWidth.setAttribute('material', {
            color: color,
          })
          lineWidth.setAttribute('position', {x: 0, y: -height/2, z: depth/2 + margin});
          
          lineWidth.object3D.rotation.z = THREE.MathUtils.degToRad(-90);
          lineWidth.object3D.rotation.x = THREE.MathUtils.degToRad(-90);
          
          lineWidth.setAttribute('text', {
            value: width + ' m',
            align: 'left',
            anchor: 'left',
            xOffset: fontPadding,
            width: fontSize,
            color: color,
          })
          
          //DEPTH
          
          let lineDepth = document.createElement('a-entity');
          lineDepth.setAttribute('geometry', {
            primitive: 'plane',
            height: depth,
            width: lineThickness,
          });
          lineDepth.setAttribute('material', {
            color: color,
          })
          lineDepth.setAttribute('position', {x: - width/2 - margin, y: -height/2, z: 0});
          
          lineDepth.object3D.rotation.x = THREE.MathUtils.degToRad(-90);
          
          lineDepth.setAttribute('text', {
            value: depth + ' m',
            align: 'right',
            anchor: 'right',
            xOffset: - fontPadding,
            width: fontSize,
            color: color,
          })
          
          //APPENDS
          
          measurements.appendChild(lineHeight);
          measurements.appendChild(lineWidth);
          measurements.appendChild(lineDepth);
          
          el.appendChild(measurements);
          
        }
      })