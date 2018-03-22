class ShortBug extends React.Component {

    constructor(props) {
        super(props);
        this.state = { bug: new BugModel(props.bug) };
        this.onEditBug = this.onEditBug.bind(this);
    }
    onEditBug() {
        this.props.onClick(this.state.bug.id);
    }
    render() {
        var date = Date.parse(this.state.bug.dateCreate);
        var dateFormat = new Date(date).toDateString();
        return (<div>
            <div className='bug-cell' onClick={this.onEditBug}>
                <div># {this.state.bug.id}</div>
                <div>{this.state.bug.name}</div>
                <div><label style={{ fontStyle: 'italic' }}>{this.state.bug.creator.firstName} {this.state.bug.creator.lastName}</label></div>
                <div>{dateFormat}</div>
            </div>
        </div>);
    }
}