import React, { useState, forwardRef } from 'react'
import styled from '@emotion/styled'
import { useForm } from 'react-hook-form'
import Button from 'components/Button'


const DEFAULT_COMMENT = `강간죄 구성요건을 동의여부로 개정 하는 데 동의합니다.`

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

const Input = styled.input(props =>({
    ...common,
    display: 'block',
    width: '100%',
    border: props.error ? '1px solid #ff0000' : common.border
}))

const Textarea = styled.textarea({
    ...common,
    display: 'block',
    width: '100%',
})

const CheckBoxLabel = styled.label({
    position: 'relative',
    display: 'inline-block',
    maxWidth: '100%',
    fontSize: '16px',
    cursor: 'pointer'
})

const CheckBoxLabelText = styled.span({
    paddingLeft: '30px'
})

const CheckBoxInput = styled.input(props=>({
    position: 'absolute',
    left: 0,
    top: 0,
    margin: 0,
    width: '0px',
    height: '0px',
    cursor: 'pointer',
    appearance: 'none',
    outline: 'none',
    border: 'none',
    background: 'none',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: '0',
        left: '0',
        width: '15px',
        height: '15px',
        border: props.error ? '1px solid #ff0000' : common.border,
        backgroundColor: '#ffffff'
    },
    '&:checked::after': {
        content: '"✓"',
        position: 'absolute',
        width: '17px',
        height: '17px',
        lineHeight: '17px',
        left: 0,
        top: 0,
        fontSize: '16px',
        textAlign: 'center'
    }
}))

const CheckBox = forwardRef((props, ref) => (
    <CheckBoxInput type="checkbox" ref={ref} {...props} />
))

const Hint = styled.p(props => ({
    fontSize: '12px',
    padding: '4px 12px',
    margin: 0,
    color: props.error && 'red'
}))

const InputGroup = styled.div({
    padding: '10px 0 0',
})

const CheckGroup = styled(InputGroup)({
    padding: '15px 0 0',
    [Hint]: {
        paddingLeft: '32px',
    }
})


const Form = ({ onSubmitted }) => {
    const [loading, setLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const { register, errors, handleSubmit } = useForm()

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

            onSubmitted?.()
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
            <form onSubmit={handleSubmit(submit)} >
                <InputGroup>
                    <Label>이름</Label>
                    <Input ref={register({ required: true })} name="name" error={errors.name} />
                    {errors.name
                        ? <Hint error={errors.name}>이름을 적어주세요</Hint>
                        : <Hint>실명을 입력해주셔야 유효한 서명이 됩니다</Hint>}
                </InputGroup>
                <InputGroup>
                    <Label>연락처</Label>
                    <Input ref={register({ required: true })} name="contact" error={errors.contact} />
                    {errors.contact
                        ? <Hint error={errors.contact}>연락처를 적어주세요</Hint>
                        : <Hint>휴대전화번호 혹은 이메일</Hint>}
                </InputGroup>
                <InputGroup>
                    <Label>주소</Label>
                    <Input ref={register({ required: true })} name="address" error={errors.address} />
                    {errors.address
                        ? <Hint error={errors.address}>주소를 적어주세요</Hint>
                        : <Hint>읍/면/동 까지만</Hint>}
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
                    <CheckBoxLabel>
                        <CheckBox ref={register} name="private" />
                        <CheckBoxLabelText>비공개</CheckBoxLabelText>
                    </CheckBoxLabel>
                    <Hint>체크하시면 목록에 표시되지 않으며 담당자만 볼 수 있습니다.</Hint>
                </CheckGroup>
                <CheckGroup>
                    <CheckBoxLabel>
                        <CheckBox ref={register({ required: true })} name="agreed" error={errors.agreed}/>
                        <CheckBoxLabelText>개인정보수집동의 (필수)</CheckBoxLabelText>
                    </CheckBoxLabel>
                    <Hint>제출하신 개인정보는 국회 제출 외의 용도로 사용되지 않으며 귀하의 동의 없이 제3자에게 제공하지 않습니다.</Hint>
                    {errors.agreed && <Hint error={errors.agreed}>개인정보수집에 동의하셔야 서명이 가능합니다</Hint>}
                </CheckGroup>
                <InputGroup>
                    <Button disabled={loading} style={{ width: '100%' }}>서명하기</Button>
                </InputGroup>
            </form>
        </div>
    )
}


export default Form
