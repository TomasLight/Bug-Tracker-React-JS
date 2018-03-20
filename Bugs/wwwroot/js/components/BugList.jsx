var globalElementIndex = 1;

class BugList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { statusNames: [], statusValues: [], bugList: [], renderEditBug: props.renderEditBug };
        //this.onAddPhone = this.onAddPhone.bind(this);
    }
    loadStatusNames() {
        var thisClass = this;
        Load(this.props.apiUrl + "/GetStatusNames", function (data) {
            thisClass.setState({ statusNames: data });
        });
    }
    loadStatusValues() {
        var thisClass = this;
        Load(this.props.apiUrl + "/GetStatusValues", function (data) {
            thisClass.setState({ statusValues: data });
        });
    }
    loadBugList() {
        var thisClass = this;
        Load(this.props.apiUrl + "/Get", function (data) {
            thisClass.setState({ bugList: data });
        });
    }
    componentDidMount() {
        this.loadStatusNames();
        this.loadStatusValues();
        this.loadBugList();
    }
    render() {
        var bugList = this.state.bugList;
        var renderBL = this.state.renderEditBug;
        return (<div className="bug-table">
            <div className="bug-header">
                <div>
                    {
                        this.state.statusNames.map(function (item) {
                            return <div key={globalElementIndex++}>{item}</div>;
                        })
                    }
                </div>
            </div>
            <div className="bug-body">
                {
                    this.state.statusValues.map(function (status) {
                        return <div key={globalElementIndex++} className="bug-column">
                            {
                                bugList.map(function (item) {
                                    if (item.status == status) {
                                        return <ShortBug key={globalElementIndex++} bug={item} onClick={renderBL} />;
                                    }
                                })
                            }
                        </div>;
                    })
                }
            </div>
        </div>);
    }
}