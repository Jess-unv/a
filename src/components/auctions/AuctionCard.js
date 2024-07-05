import React, { useContext } from 'react';
import Countdown from 'react-countdown';
import { AuthContext } from '../../context/AuthContext';
import './AuctionCard.css';

const renderer = ({ days, hours, minutes, seconds, completed, props }) => {
  if (completed) {
    return null;
  }

  return (
    <div className="col">
      <div className="card shadow-sm">
        <div
          style={{
            height: '320px',
            backgroundImage: `url(${props.item.imgUrl})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
          className="w-100"
        />

        <div className="card-body">
          <p className="lead display-6">{props.item.title}</p>
          <div className="d-flex justify-content-between align-items-center">
            <h5>
              {days} Dias {hours} horas {minutes} mins {seconds} seg
            </h5>
          </div>
          <p className="card-text">{props.item.desc}</p>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              {!props.owner ? (
                <div
                  onClick={() => props.bidAuction()}
                  className="btn btn-outline-secondary"
                >
                  Apostar
                </div>
              ) : props.owner.email === props.item.email ? (
                <div
                  onClick={() => props.endAuction(props.item.id)}
                  className="btn btn-outline-secondary"
                >
                  Cancelar Subasta
                </div>
              ) : props.owner.email === props.item.curWinner ? (
                <p className="display-6">Ganador</p>
              ) : (
                <div
                  onClick={() =>
                    props.bidAuction(props.item.id, props.item.curPrice)
                  }
                  className="btn btn-outline-secondary"
                >
                  Ofertar
                </div>
              )}
            </div>
            <p className="display-6">${props.item.curPrice}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AuctionCard = ({ item }) => {
  let expiredDate = item.duration;
  const { currentUser, bidAuction, endAuction } = useContext(AuthContext);

  return (
    <Countdown
      owner={currentUser}
      date={expiredDate}
      bidAuction={bidAuction}
      endAuction={endAuction}
      item={item}
      renderer={renderer}
    />
  );
};
