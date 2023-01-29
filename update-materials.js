AFRAME.registerComponent('update-materials', {
        schema: {
          texture: {type: 'array', default: 'https://cdn.glitch.global/940e20c3-a1e1-440f-bc42-e14ab5ef4b62/SorollaBakeGrey.jpg?v=1674927296631, https://cdn.glitch.global/940e20c3-a1e1-440f-bc42-e14ab5ef4b62/SorollaBakeOrange.jpg?v=1674927278317, https://cdn.glitch.global/940e20c3-a1e1-440f-bc42-e14ab5ef4b62/SorollaBakeBlue.jpg?v=1674927287672'}
        },
        
        init: function(){
          this.tex1 = new THREE.TextureLoader().load(this.data.texture[0]);
          this.tex2 = new THREE.TextureLoader().load(this.data.texture[1]);
          this.tex3 = new THREE.TextureLoader().load(this.data.texture[2]);
          this.tex1.flipY = false;
          this.tex2.flipY = false;
          this.tex3.flipY = false;
          this.matArray = [this.tex1, this.tex2, this.tex3];
          this.buttonArray = ['https://cdn.glitch.global/d53aff98-3990-4126-83f2-4ac2eb8d01da/Metal%20gris.jpg?v=1674999628130', 'https://cdn.glitch.global/d53aff98-3990-4126-83f2-4ac2eb8d01da/Metal%20naranja.jpg?v=1674999632825', 'https://cdn.glitch.global/d53aff98-3990-4126-83f2-4ac2eb8d01da/Metal%20azul.jpg?v=1674999632285']
          // Wait for model to load.
          this.el.addEventListener('model-loaded', () => {
            // Grab the mesh / scene.
            const obj = this.el.getObject3D('mesh');
            // Go over the submeshes and modify materials we want.
            obj.traverse(node => {
              if(node.isMesh){
                //console.log(node)
                //node.material.shader = 'flat';
                node.material.color.set('white');
                node.material.map = this.tex1;
                this.matIndex = 0;
              }
                
              
            });
          });
        },
        
        update: function () {
          
          this.el.addEventListener('toggleMaterial', () => {
            let button = document.getElementById('materialButton');
            // Grab the mesh / scene.
            const obj = this.el.getObject3D('mesh');
            // Go over the submeshes and modify materials we want.
            obj.traverse(node => {
              if(node.isMesh){
                if(this.matIndex < this.matArray.length -1){
                  this.matIndex += 1;
                  node.material.map = this.matArray[this.matIndex];
                  button.style.backgroundImage = 'url(' + this.buttonArray[this.matIndex] + ')';
                }else{
                  this.matIndex = 0;
                  node.material.map = this.matArray[this.matIndex];
                  button.style.backgroundImage = 'url(' + this.buttonArray[this.matIndex] + ')';
                }
              }
                
              
            });
          })
        }
      })