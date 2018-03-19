import * as BugModelModule from '~/classes/BugModel';
import * as React from 'react';

export class ShortBug extends React.Component {

    constructor(props) {
        super(props);
        this.state = { bug: new BugModelModule.BugModel(props.bug) };

        this.onEditBug = this.onEditBug.bind(this.state.bug.id);
    }
    onEditBug(bugId) {
        var test = 1;
    }
    render() {
        return <div>
            <div className='bug-cell' onClick={this.onEditBug}>
                <div># {this.state.bug.id}</div>
                <div>{this.state.bug.name}</div>
            </div>
        </div>;
    }
}