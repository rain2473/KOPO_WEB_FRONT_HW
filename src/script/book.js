// 함수 정의
function displayJsonData(url) {
    function getHttpRequest(url, callback) {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function (event) {
            if (request.readyState == 4) {
                if (request.status == 200) {
                    // 요청이 정상적으로 처리된 경우
                    console.log("success");
                    callback(request.responseText);
                } else {
                    // 에러가 발생한 경우
                }
            }
        }

        const method = "GET";
        request.open('get', url, true);
        request.send();
    }

    function createTable(obj) {
        let table = document.createElement('table');
        table.classList.add("table");
        let i = 1;
        let thead = document.createElement('thead');
        let tbody = document.createElement('tbody');
        let keys = Object.keys(obj[0]);

        let headerRow = document.createElement('tr');
        keys.forEach(key => {
            let th = document.createElement('th');
            th.textContent = key;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        obj.forEach(el => {
            let tr = document.createElement('tr');
            keys.forEach(key => {
                let td = document.createElement('td');
                if (key === 'image') {
                    td.appendChild(el[key]);
                } else {
                    td.textContent = el[key];
                }
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });

        table.appendChild(tbody);
        return table;
    }

    getHttpRequest(url, function (response) {
        var json = JSON.parse(response);

        for (var object in json) {
            let cover = document.createElement('img');
            cover.src = json[object].image_src;
            json[object].image = cover;
        }

        let table = createTable(json);
        document.body.appendChild(table);
    });
}
