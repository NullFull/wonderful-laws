import styled from '@emotion/styled'


const Choices = styled.ul({
    display: 'grid',
    gap: '10px',
    gridTemplateColumns: '1fr 1fr',
})


Choices.Choice = ({ name, value, onChange, children, ...props }) => (
    <li
        {...props}
        css={{
            listStyle: 'none',
            lineHeight: '26px',
            padding: 0,
            textAlign: 'center',
            'input': {
                appearance: 'none',
            },
            'input ~ span': {
                display: 'block',
                cursor: 'pointer',
                padding: '3px 0',
                border: '1px solid #157EFA',
                background: 'white',
                opacity: '0.5',
            },
            'input:checked ~ span': {
                opacity: '1.0',
            },
        }}
    >
        <label>
            <input
                name={name}
                type="radio"
                value={value}
                onChange={onChange}
            />
            <span>{children}</span>
        </label>
    </li>
)


export default Choices
