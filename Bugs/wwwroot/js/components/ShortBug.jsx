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
        return (<div>
            <div className='bug-cell' onClick={this.onEditBug}>
                <div># {this.state.bug.id}</div>
                <div>{this.state.bug.name}</div>
                <div>{this.state.bug.creator.firstName} {this.state.bug.creator.lastName}</div>
                <div>{this.state.bug.dateCreate}</div>
            </div>
        </div>);
    }
}