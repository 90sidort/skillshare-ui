import React from "react";
import { Button, Modal, Backdrop, Fade } from "@material-ui/core";

import useStylesModal from "../../styles/modal.style";

const AppModal = (props) => {
  const classes = useStylesModal();
  const [open, setOpen] = React.useState(props.open);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2>{props.title}</h2>
            <p>{props.message}</p>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default AppModal;
