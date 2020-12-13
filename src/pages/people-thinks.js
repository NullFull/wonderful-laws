import React from 'react'


const SharePopup = () => {
    const title = '지금 법 이대로 괜찮은가요?'
    const description = ''
    const image = '나는 현행 강간법을 납득할 수 없습니다'
}


const PeopleThinks = () => {
    // TODO : 실제 데이터 반영
    return (
        <div style={{textAlign: 'center'}}>
            <h3>사람들의 생각</h3>
            <div style={{maxWidth: '360px', margin: '0 auto'}}>
                <div style={{border: '1px solid gray', height: '20px'}}>
                    <div style={{height: '100%', background: 'gray', width: '90%'}} />
                </div>
                <div style={{overflow: 'hidden'}}>
                    <span style={{float: 'left'}}>개정해야해요 (123,123)</span>
                    <span style={{float: 'right'}}>지금도 괜찮네요 (1,231)</span>
                </div>
            </div>
            <div style={{textAlign: 'center'}}>
                <h3>공유하기</h3>
                <div>
                    <input value="https://assdaadsads주소주소" />
                </div>
                <div>
                    <button>Facebook</button>
                    <button>Twitter</button>
                    <button>Kakao</button>
                </div>
            </div>

            <div style={{textAlign: 'center'}}>
                <h3>생각을 남겨주세요</h3>
                <div>
                    <div>
                        <textarea />
                    </div>
                    <div>
                        <button>한마디 남기기</button>
                    </div>
                </div>

                <div>
                    <ul>
                        <li>누군가의 의견</li>
                        <li>누군가의 의견</li>
                        <li>누군가의 의견</li>
                        <li>누군가의 의견</li>
                        <li>누군가의 의견</li>
                        <li>누군가의 의견</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default PeopleThinks
