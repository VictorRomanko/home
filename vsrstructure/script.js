document.addEventListener("DOMContentLoaded", function() {
    const boxes = document.querySelectorAll('.box');
    const toys = document.querySelectorAll('.toy');
    boxes.forEach(box => {
        box.addEventListener('mouseenter', function() {
            box.classList.add('animated');
        });

             box.addEventListener('mouseleave', function() {
            setTimeout(() => box.classList.add('scaledown'), 100);   
        });
        
        

        });
    
    
    
    
    
    
    
    
    
       toys.forEach(toy => {
        toy.addEventListener('mouseleave', function() {
            setTimeout(() => toy.classList.add('fall'), 0);
        });


        });
    }); 
    
    
