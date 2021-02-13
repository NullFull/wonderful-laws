import React from 'react'
import Button from 'components/Button'
import styled from '@emotion/styled'


const Label = styled.label({
    display: 'block',
})

const Input = styled.input({
    display: 'block',
    width: '100%',
})

const Textarea = styled.textarea({
    display: 'block',
    width: '100%',
})

const CheckBox = styled(props => <input type="checkbox" {...props} />)()

const Hint = styled.p({
    fontSize: '12px',
    padding: '4px 0',
    margin: 0,
})

const InputGroup = styled.div({
    padding: '8px 0',
})


const Form = () => (
    <div css={{
        textAlign: 'left'
    }}>
        <InputGroup>
            <Label>이름</Label>
            <Input />
            <Hint>실명을 입력해주셔야 유효한 서명이 됩니다</Hint>
        </InputGroup>
        <InputGroup>
            <Label>연락처 (휴대전화번호 혹은 이메일)</Label>
            <Input />
        </InputGroup>
        <InputGroup>
            <Label>주소 (읍/면/동 까지만)</Label>
            <Input />
        </InputGroup>
        <InputGroup>
            <Label>한마디</Label>
            <Textarea defaultValue="강간죄 ㅇㅇㅇ로 개정에 동의합니다." />
            <Label><CheckBox />목록에 표시</Label>
            <Hint>체크하지 않으면 아래 목록에 표시 되지 않으며 국회 제출 용도로만 사용됩니다.</Hint>
        </InputGroup>
        <InputGroup>
            <Label><CheckBox />개인정보수집동의</Label>
            <Hint>제출하신 개인정보는 국회 제출 외의 용도로 사용되지 않으며 귀하의 동의 없이 제3자에게 제공하지 않습니다.</Hint>
        </InputGroup>

        <Button onClick={() => submit()}>서명하기</Button>
    </div>
)

export default Form
