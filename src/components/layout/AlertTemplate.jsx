import Icon from "components/utils/Icon";

const AlertTemplate = ({ style, options, message, close, type }) => (
    <div style={style} className={`alert is-${options.type}`}>
        {message}
        <button onClick={close}>
            <Icon icon='cancel' />
        </button>
    </div>
)

export default AlertTemplate;