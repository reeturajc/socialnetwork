import React, { Component } from 'react'
import { connect } from 'react-redux'

class PostListPage extends Component {
    render() {
        return (
            <div>
                <h2>Welcome To PostListPage</h2>
            </div>
        )
    }    
}

const mapStateToProps = (state:any) => ({

});

const mapDispatchToProps = (dipatch:any) => ({
    
});

export default connect(mapStateToProps,mapDispatchToProps)(PostListPage);
