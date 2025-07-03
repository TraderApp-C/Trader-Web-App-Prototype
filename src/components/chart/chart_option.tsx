import "./chart_option.css";
interface ChartOptionProps {
    label: string
}


const ChartOption: React.FC<ChartOptionProps> = ({label}) => {

    return (
        <div className="option">
            <h4>{label}</h4>
        </div>
    );
}

export default ChartOption;