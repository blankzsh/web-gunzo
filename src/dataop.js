fetch('https://api.allorigins.win/get?url=https://gunzo.oss-cn-shenzhen.aliyuncs.com/Data/countryData.json')
    .then((response) => response.json())
    .then((data) => {
        // 解析 allorigins 返回的内容
        const parsedData = JSON.parse(data.contents);
        const datalist = document.getElementById('nationlist');
        parsedData.forEach((country) => {
            const option = document.createElement('option');
            option.value = country.value;
            option.textContent = country.label;
            datalist.appendChild(option);
        });
    })
    .catch((error) => console.error('Error loading country data:', error));