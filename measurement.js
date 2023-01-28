AFRAME.registerComponent('measurement', {
        schema:{
          title: {type: 'string', default: 'Sorolla'},
          subtitle: {type: 'string', default: 'Silla electrica plegable'},
        },
        init: function(){
          let el = this.el;
          el.addEventListener('model-loaded', () => {
          
            let assetSize = new THREE.Vector3();

            console.log(el);

            let boundingBox = new THREE.Box3().setFromObject(el.object3D);

            boundingBox.getSize(assetSize);
            console.log(assetSize);
            
            let width = assetSize.x.toFixed(2);
            let height = assetSize.y.toFixed(2);
            let depth = assetSize.z.toFixed(2);

            this.measurements = document.createElement('a-entity');

            let margin = 0.2;
            let color = 'white';
            let lineThickness = 0.005;
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
            lineHeight.setAttribute('position', {x: width/2 + margin, y: 0, z: - depth/2});

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

            lineWidth.object3D.rotation.z = THREE.MathUtils.degToRad(90);
            lineWidth.object3D.rotation.x = THREE.MathUtils.degToRad(-90);

            lineWidth.setAttribute('text', {
              value: width + ' m',
              align: 'right',
              anchor: 'right',
              xOffset: - fontPadding,
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
            lineDepth.setAttribute('position', {x: width/2 + margin, y: -height/2, z: 0});

            lineDepth.object3D.rotation.x = THREE.MathUtils.degToRad(-90);

            lineDepth.setAttribute('text', {
              value: depth + ' m',
              align: 'left',
              anchor: 'left',
              xOffset: fontPadding,
              width: fontSize,
              color: color,
            })
            
            //TITLES
            
            let title = document.createElement('a-entity');
            title.setAttribute('position', {x: -width/2, y: height/2 - margin, z: depth/2});
            title.object3D.rotation.y = THREE.MathUtils.degToRad(90);
            title.setAttribute('text', {
              value: this.data.title,
              align: 'right',
              anchor: 'right',
              width: 10,
              color: 'lightblue',
              font: 'https://cdn.aframe.io/fonts/Exo2SemiBold.fnt',
            })
            
            let subtitle = document.createElement('a-entity');
            subtitle.setAttribute('position', {x: -width/2, y: 0, z: depth/2});
            subtitle.object3D.rotation.y = THREE.MathUtils.degToRad(90);
            subtitle.setAttribute('text', {
              value: this.data.subtitle,
              align: 'right',
              anchor: 'right',
              width: 4,
              color: 'lightblue',
              font: 'https://cdn.aframe.io/fonts/Aileron-Semibold.fnt',
            })

            //APPENDS

            this.measurements.appendChild(lineHeight);
            this.measurements.appendChild(lineWidth);
            this.measurements.appendChild(lineDepth);
            
            this.measurements.appendChild(title);
            this.measurements.appendChild(subtitle);

            this.el.appendChild(this.measurements);
            this.measurements.setAttribute('visible', false);
            
          })
        },
        update: function(){
          this.el.addEventListener('toggleInfo', ()=>{
            if(this.measurements.object3D.visible){
              this.measurements.setAttribute('visible', false);
            }else{
              this.measurements.setAttribute('visible', true);
            }
            
          })
        }
      })