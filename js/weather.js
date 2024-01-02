

const container = document.querySelector('.container');
const bigContents = document.querySelector('.contents');
const tabs = document.querySelectorAll('.tab');
// console.log(tabs);

// 取資料
fetch('https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-786023BA-16EC-4367-9CA7-3BA6D210B743')
    .then((response) => { // 對方回覆給我
        return response.json(); // 回傳Json格式的資料  response.json()
    })
    .then((data) => { // 接收資料
        console.log(data.records.location); // 整理資料
        let menu = data.records.location //提取location地區的資料,並儲存在menu
        console.log(menu); //確認是否已儲存在menu裡
        menu.forEach((item) => {
            // 先判斷天氣狀況，再生成相對應圖片
            let stateNum = item.weatherElement[0].time[0].parameter.parameterValue;
            let img_path;
            if (stateNum == 1) {
                img_path = "./weather-img/晴天.svg"
            }
            else if (stateNum == 2) {
                img_path = "./weather-img/晴時多雲.svg"
            }
            else if (stateNum == 3) {
                img_path = "./weather-img/多雲時晴.svg"
            }
            else if (stateNum == 4) {
                img_path = "./weather-img/多雲.svg"
            }
            else if (stateNum == 5) {
                img_path = "./weather-img/多雲時陰.svg"
            }
            else if (stateNum == 6) {
                img_path = "./weather-img/陰時多雲.svg"
            }
            else if (stateNum == 7) {
                img_path = "./weather-img/陰天.svg"
            }
            else if (stateNum == 8) {
                img_path = "./weather-img/雨天.svg"
            }
            else if (stateNum == 9) {
                img_path = "./weather-img/多雲時陰短暫雨.svg"
            }
            else {
                img_path = `https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/day/${stateNum}.svg`
            }
             //生成每個區塊，每層的撈資料並log確認
            bigContents.innerHTML += `
                <div class="card">    
                        <img class="img" src=${img_path} alt="天氣圖片">                    
                        <div class="locationName">${item.locationName}</div>
                        <div class="state">${item.weatherElement[0].time[0].parameter.parameterName}</div>
                        <div class="minT">⛄最低溫｜${item.weatherElement[2].time[0].parameter.parameterName}°C</div>
                        <div class="maxT">🌞最高溫｜${item.weatherElement[4].time[0].parameter.parameterName}°C</div>
                        <div class="bodyT">體感｜${item.weatherElement[3].time[0].parameter.parameterName}</div>
                    </div>
                    `;

            setTimeout(() => {
                
                const cards = document.querySelectorAll('.card');

                //初始頁，生成全部地區
                cards.forEach((card) => {
                    card.classList.add('showup');
                })
                //設置tab、出現對應資料
                tabs.forEach((tab) => {
                    tab.addEventListener('click', () => {
                        tabs.forEach((item, index) => {
                            item.classList.remove('active');
                            cards[index].classList.remove('showup')
                        })
                        // 每個都綁上監聽事件
                        tab.classList.add('active');

                        let all = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
                        let areaN = [1, 3, 4, 5, 7, 13, 18];
                        let areaC = [8, 9, 11, 14, 20];
                        let areaS = [0, 2, 6, 15, 17];
                        let areaE = [10, 12];
                        let areaO = [16, 19, 21];
                        
                        // 全部地區
                        if (tabs[0].classList.contains('active')) {
                            cards.forEach((card, index) => {
                                card.classList.remove('showup');
                                if (all.includes(index)) {
                                    card.classList.add('showup');
                                }
                            })
                        }
                        // 北部地區
                        else if (tabs[1].classList.contains('active')) {
                            cards.forEach((card, index) => {
                                card.classList.remove('showup');
                                if (areaN.includes(index)) {
                                    card.classList.add('showup');
                                }
                            })
                        }
                        // 中部地區
                        else if (tabs[2].classList.contains('active')) {
                            cards.forEach((card, index) => {
                                card.classList.remove('showup');
                                if (areaC.includes(index)) {
                                    card.classList.add('showup');
                                }
                            })
                        }
                        // 南部地區
                        else if (tabs[3].classList.contains('active')) {
                            cards.forEach((card, index) => {
                                card.classList.remove('showup');
                                if (areaS.includes(index)) {
                                    card.classList.add('showup');
                                }
                            })
                        }
                        // 東部地區
                        else if (tabs[4].classList.contains('active')) {
                            cards.forEach((card, index) => {
                                card.classList.remove('showup');
                                if (areaE.includes(index)) {
                                    card.classList.add('showup');
                                }
                            })
                        }
                        // 離島地區
                        else if (tabs[5].classList.contains('active')) {
                            cards.forEach((card, index) => {
                                card.classList.remove('showup');
                                if (areaO.includes(index)) {
                                    card.classList.add('showup');
                                }

                            })
                        }
                        

                    });
                });
            });
        });
    });
