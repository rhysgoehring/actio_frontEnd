import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import truncateText from '../helpers/eventHelpers.js'
import GoogleMap from './googleMap';
import {reduxForm, Field, reset} from 'redux-form';

class EventCardSmall extends Component {
  render(){
    console.log('this.props', this.props)
    return(
        <div className='col-md-12'>
          <div className='thumbnail myEventCard'>
            <img className="img-responsive myEventImg" src={this.props.event.event_pic} alt={this.props.eventTitle} />
            <div className='caption myEventCaption'>
              <h4 className='myEventText'>{this.props.event.name}</h4>
              <p className='myEventText'>{truncateText(this.props.event.description)}</p>
            </div>
            <div className="ec_btn_container">
              <button className='card-link eventBtn ec_btn' onClick={this.props.handleModal}>See More</button>
            </div>
            <Modal
              show={this.props.showModal} dialogClassName="custom-modal"
              className='actModal'>
              <Modal.Header>
                <div className="modal_cover">
                  <div className="cover_container">
                    <div className="cover_transparency"></div>
                    <div className="modal_cover_img img-responsive" style={{backgroundImage:'url('+this.props.event.event_pic+')'}}></div>
                    <div className="event_title">
                      <h3><img src={this.props.icon} style={{height:'85px', width:'85px'}}/><strong>{this.props.event.name}</strong></h3>
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
                            <li>At: <strong>{this.props.event.location}</strong></li>
                            <li>On: <strong>{this.props.event.event_date}</strong></li>
                          </ul>
                        </div>
                        <GoogleMap
                          latLngs={[{lat:this.props.event.lat, lng:this.props.event.lng,icon:this.props.icon}]} center zoom={16} lat={this.props.event.lat} lng={this.props.event.lng} style={{paddingLeft: '2.0em'}} />
                        <h4 className='text-center'><strong>About {this.props.event.name}:</strong></h4>
                        <p className='text-left'>{this.props.eventDesc}</p>
                        <h4 className='text-center'><strong>Event Creator: {this.props.eventInfo.owner.name}</strong></h4>
                        <p className='text-left'>{this.props.eventInfo.owner.info}</p>
                        <h4 className='text-center'><strong>Who Else is Going?</strong></h4>
                        <ul className='list-inline'>
                         {this.props.renderJoinedUsers()}
                        </ul>
                      </div>
                      <div className='col-md-5'>
                        <h4 className='text-center'><strong>Comments:</strong></h4>
                        <div className="row">
                          <form onSubmit={this.props.handleSubmit}>
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
                        {this.props.renderMessages()}
                      </div>
                    </div>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                {this.props.renderButtons()}
                <button style={{color:'black'}} className="btn eventBtn" onClick={this.props.handleModal}>Close</button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
    )
  }
}

EventCardSmall = reduxForm({
  form: "comments",
  fields: "body",
})(EventCardSmall);

export default EventCardSmall;
