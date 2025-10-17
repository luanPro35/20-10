// Hiệu ứng ảnh xếp lớp ở góc phải dưới - đứng yên
document.addEventListener('DOMContentLoaded', function() {
    const stackedImages = document.querySelector('.stacked-images');
    const stackedImagesItems = document.querySelectorAll('.stacked-image');
    
    // Thiết lập góc xoay cố định cho mỗi ảnh
    stackedImagesItems.forEach((img, index) => {
        // Thiết lập góc xoay ban đầu
        let rotation = 0;
        if (index === 0) rotation = -18;
        else if (index === 1) rotation = -12;
        else if (index === 2) rotation = -6;
        else if (index === 3) rotation = 2;
        else if (index === 4) rotation = 8;
        else if (index === 5) rotation = 15;
        
        // Áp dụng góc xoay cố định
        img.style.transform = `rotate(${rotation}deg)`;
    });
});