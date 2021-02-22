import React, { useState, forwardRef } from 'react'
import styled from '@emotion/styled'
import { useForm } from 'react-hook-form'
import Button from 'components/Button'


const DEFAULT_COMMENT = `강간죄 성립요건을 동의여부로 개정 하는 데 동의합니다.`

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

const CheckBox = forwardRef((props, ref) => (
    <input type="checkbox" ref={ref} {...props} />
))

const Hint = styled.p({
    fontSize: '12px',
    padding: '4px 12px',
    margin: 0,
})

const InputGroup = styled.div({
    padding: '8px 0 0',
})

const CheckGroup = styled(InputGroup)({
    [Hint]: {
        paddingLeft: '32px',
    }
})


const Form = () => {
    const [loading, setLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const { register, handleSubmit } = useForm()

    const submit = async data => {
        setLoading(true)

        try {
            await fetch('/api/signs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: data.name,
                    contact: data.contact,
                    address: data.address,
                    private: data.private[0] === 'on',
                    comment: data.comment || DEFAULT_COMMENT,
                })
            })

            setSubmitted(true)
        } catch (e) {
            // TODO
        } finally {
            setLoading(false)
        }
    }

    if (submitted) {
        return (
            <div>
                <h3>서명이 접수되었습니다.</h3>
            </div>
        )
    }

    return (
        <div css={{ textAlign: 'left' }}>
            <form onSubmit={handleSubmit(submit)}>
                <InputGroup>
                    <Label>이름</Label>
                    <Input ref={register} name="name" />
                    <Hint>실명을 입력해주셔야 유효한 서명이 됩니다</Hint>
                </InputGroup>
                <InputGroup>
                    <Label>연락처</Label>
                    <Input ref={register} name="contact" />
                    <Hint>휴대전화번호 혹은 이메일</Hint>
                </InputGroup>
                <InputGroup>
                    <Label>주소</Label>
                    <Input ref={register} name="address" />
                    <Hint>읍/면/동 까지만</Hint>
                </InputGroup>
                <InputGroup>
                    <Label>한마디</Label>
                    <Textarea
                        ref={register}
                        name="comment"
                        placeholder={DEFAULT_COMMENT}
                    />
                </InputGroup>
                <CheckGroup>
                    <Label>
                        <CheckBox ref={register} name="private" />
                        비공개
                    </Label>
                    <Hint>체크하시면 목록에 표시되지 않으며 담당자만 볼 수 있습니다.</Hint>
                </CheckGroup>
                <CheckGroup>
                    <Label>
                        <CheckBox ref={register} name="agreed" />
                        개인정보수집동의 (필수)
                    </Label>
                    <Hint>제출하신 개인정보는 국회 제출 외의 용도로 사용되지 않으며 귀하의 동의 없이 제3자에게 제공하지 않습니다.</Hint>
                </CheckGroup>
                <InputGroup>
                    <Button disabled={loading} style={{ width: '100%' }}>서명하기</Button>
                </InputGroup>
            </form>
        </div>
    )
}


export default Form
