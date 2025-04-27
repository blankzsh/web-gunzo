document.addEventListener('DOMContentLoaded', function() {
  const imageInput = document.getElementById('image-input');
  const imageFilenameInput = document.getElementById('image-filename');
  const saveFilenameInput = document.getElementById('save-filename');
  const downloadBtn = document.getElementById('download-btn');
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  if (imageInput) {
    imageInput.addEventListener('change', function(event) {
      const file = event.target.files[0];
      if (file) {
        imageFilenameInput.value = file.name;
        // 自动提取文件名（不含扩展名）作为默认保存名
        const fileNameWithoutExt = file.name.split('.').slice(0, -1).join('.');
        saveFilenameInput.value = fileNameWithoutExt || 'canvas-image';

        // 读取文件并绘制到 canvas 上
        const reader = new FileReader();
        reader.onload = function(e) {
          const img = new Image();
          img.crossOrigin = 'anonymous'; // 设置 crossOrigin 属性
          img.onload = function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            downloadBtn.disabled = false; // 启用下载按钮
          };
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  }

  if (downloadBtn) {
    downloadBtn.addEventListener('click', function() {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      // 使用自定义文件名，如果为空则使用原文件名或默认名称
      const fileName = saveFilenameInput.value || imageFilenameInput.value || 'gunzo-face.png';
      // 确保文件名有.png扩展名
      const finalFileName = fileName.endsWith('.png') ? fileName : `${fileName}.png`;
      link.download = finalFileName;
      link.click();
    });
  }
});