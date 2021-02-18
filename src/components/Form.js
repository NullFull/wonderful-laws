import React from 'react'
import styled from '@emotion/styled'
import Button from 'components/Button'


const common = {
    borderRadius: '20px',
    border: '1px solid #157EFA',
    padding: '12px 22px',
    outline: 'none',
}

const Label = styled.label({
    display: 'block',
    padding: '4px 12px',
    fontSize: '16px',
})

const Input = styled.input({
    ...common,
    display: 'block',
    width: '100%',
})

const Textarea = styled.textarea({
    ...common,
    display: 'block',
    width: '100%',
})

const CheckBox = styled(props => <input type="checkbox" {...props} />)()

const Hint = styled.p({
    fontSize: '12px',
    padding: '4px 12px',
    margin: 0,
})

const InputGroup = styled.div({
    padding: '8px 0 0',
})


const Form = () => {
    const [submitted, setSubmitted] = React.useState(false)

    const submit = () => {
        setSubmitted(true)
    }

    if (submitted) {
        return (
            <div>
                <h3>서명이 접수되었습니다.</h3>
            </div>
        )
    }

    return (
        <div css={{
            textAlign: 'left'
        }}>
            <InputGroup>
                <Label>이름</Label>
                <Input/>
                <Hint>실명을 입력해주셔야 유효한 서명이 됩니다</Hint>
            </InputGroup>
            <InputGroup>
                <Label>연락처 (휴대전화번호 혹은 이메일)</Label>
                <Input/>
            </InputGroup>
            <InputGroup>
                <Label>주소 (읍/면/동 까지만)</Label>
                <Input/>
            </InputGroup>
            <InputGroup>
                <Label>한마디</Label>
                <Textarea defaultValue="강간죄를 ㅇㅇㅇ로 개정 하는데 동의합니다."/>
            </InputGroup>
            <InputGroup>
                <Label><CheckBox/>비공개</Label>
                <Hint>체크하시면 목록에 표시되지 않으며 담당자만 볼 수 있습니다.</Hint>
            </InputGroup>
            <InputGroup>
                <Label><CheckBox/>개인정보수집동의 (필수)</Label>
                <Hint>제출하신 개인정보는 국회 제출 외의 용도로 사용되지 않으며 귀하의 동의 없이 제3자에게 제공하지 않습니다.</Hint>
            </InputGroup>
            <InputGroup style={{ textAlign: 'center' }}>
                <Button style={{ width: '100%' }} onClick={() => submit()}>서명하기</Button>
            </InputGroup>
        </div>
    )
}


export default Form
