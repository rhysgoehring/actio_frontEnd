import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import truncateText from '../helpers/eventHelpers.js'


class EventCardSmall extends Component {
  render(){
    return(
      <div className="row">
        <div className='col-md-12'>
          <div className='thumbnail myEventCard'>
            <img className="img-responsive myEventImg" src={this.props.eventPic} alt={this.props.eventTitle} />
            <div className='caption myEventCaption'>
              <h4 className='myEventText'>{this.props.eventTitle}</h4>
              <p className='myEventText'>{truncateText(this.props.eventDesc)}</p>
            </div>
            <div className="ec_btn_container">
              <button className='card-link eventBtn ec_btn' onClick={this.handleModalClick.bind(this)}>See More</button>
            </div>
            <Modal
              show={this.state.showModal} dialogClassName="custom-modal"
              className='actModal'>
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
                          <ul style={{listStyle:'none'}} className='list-group'>
                            <li>At: <strong>{this.props.eventLocation}</strong></li>
                            <li>On: <strong>{this.props.eventDate}</strong></li>
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
        </div>
      </div>
    )
  }
}



export default EventCardSmall;
