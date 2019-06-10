import React, { Component } from 'react'

export default class SpecializationList extends Component {
    render() {
        return (
            <div style={{"overflowY": "scroll", "height":"3em"}}>
        <ul className="spec-ul">
            {
              Object.keys(this.props.specializations).map(function(key) {
                return <li className="spec-li" key={key}>{this.props.specializations[key]}</li>
              }.bind(this))
            }
          </ul>
         </div>
        )
    }
}

