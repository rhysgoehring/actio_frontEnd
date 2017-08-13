import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';




class EventCardLarge extends Component {
  render(){
    return (
      <div className='eventCardContainer' style={{marginLeft: '1.0em'}}>
        <div className='card actCard'>
          <div className='row'>
            <div className='col-md-12 col-xs-12'>
               <img className="allEventPic" src={this.props.eventPic} alt={this.props.eventTitle}
               />
            </div>
            <div className='col-md-12 col-md-offset-0 col-xs-12 '>
                 {/*<img src={this.props.icon} className="eventCardImg" /> */}
                <h4 className="card-title text-center allEventTitle"><strong>{this.props.eventTitle}</strong></h4>
                <p className="card-text text-left allEventDesc">{this.props.eventDesc}</p>
                <ul className="actList">
                  <li>At: <strong>{this.props.eventLocation}</strong></li>
                  <li>On: <strong>{this.props.eventDate}</strong></li>
                </ul>
            </div>
          </div>
          <div className='row'>
            <div className="card-block btnRow">
              <button className='btn eventBtn' onClick={this.handleModalClick.bind(this)}>See More</button>
              {this.renderButtons()}
            </div>
          </div>
          <div className='card-block btn-row'>
               {this.renderEditDelete()}
          </div>
        </div>
        <Modal
          show={this.state.showModal} dialogClassName="custom-modal"
          className='actModal'
            >
          <Modal.Header>
            <div className="modal_cover">
              <div className="cover_container">
                <div className="cover_transparency"></div>
                <div className="modal_cover_img img-responsive" style={{backgroundImage:'url('+this.props.eventPic+')'}}></div>
                <div className="event_title">
                  <h3><img src={this.props.icon} style={{height:'85px', width:'85px'}}/><strong>{this.props.eventTitle}</strong></h3>
                </div>
              </div>
            </div>
          </Modal.Header>
          <Modal.Body>
            <div className='row container'>
              <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                <div className='row'>
                  <div className='col-md-5'>
                    <h4 className='text-center'><strong>Event Info</strong></h4>
                    <div className='row container'>
                      <ul className='list-inline'>
                        <li className="list-inline-item">At: <strong>{this.props.eventLocation}</strong></li>
                        <li className="list-inline-item">On: <strong>{this.props.eventDate}</strong></li>
                      </ul>
                    </div>
                    <GoogleMap
                      latLngs={[{lat:this.props.eventLat, lng:this.props.eventLng,icon:this.props.icon}]} center zoom={16} lat={this.props.eventLat} lng={this.props.eventLng} style={{paddingLeft: '2.0em'}} />
                    <h4 className='text-center'><strong>About {this.props.eventTitle}:</strong></h4>
                    <p className='text-left'>{this.props.eventDesc}</p>
                    <h4 className='text-center'><strong>Event Creator: {this.state.eventOwner.name}</strong></h4>
                    <p className='text-left'>{this.state.eventOwner.info}</p>
                    <h4 className='text-center'><strong>Who Else is Going?</strong></h4>
                    <ul className='list-inline'>
                     {this.renderJoinedUsers()}
                    </ul>
                  </div>
                  <div className='col-md-5'>
                    <h4 className='text-center'><strong>Comments:</strong></h4>
                    <div className="row">
                      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                        <fieldset className="form-group">
                          <span className="col-md-12">
                            <label>Post a Comment</label>
                            <Field
                            name="body"
                            type="text"
                            component="textarea"
                            className="form-control" />
                            <button style={{color:'black'}} type="submit" className="btn eventBtn">Comment</button>
                          </span>
                        </fieldset>
                      </form>
                    </div>
                    {this.renderMessages()}
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            {this.renderButtons()}
            <button style={{color:'black'}} className="btn eventBtn" onClick={this.handleModalClick.bind(this)}>Close</button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}



export default EventCardLarge;
