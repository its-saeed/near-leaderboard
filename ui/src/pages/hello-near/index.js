import { useState, useEffect, useContext } from 'react';

import { NearContext } from '@/context';
import styles from '@/styles/app.module.css';
import { HelloNearContract } from '../../config';
import { Cards } from '@/components/cards';
import ToggleButton from '@mui/material/ToggleButton';
import Button from '@mui/material/Button';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// Contract that the app will interact with
const CONTRACT = HelloNearContract;

function createData(
  name,
  score,
) {
  return { name, score };
}

export default function HelloNear() {
  const { signedAccountId, wallet } = useContext(NearContext);

  const [newGreeting, setNewGreeting] = useState('loading...');
  const [loggedIn, setLoggedIn] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [artists, setArtists] = useState([]);

  // useEffect(() => {
  //   if (!wallet) return;

  //   wallet.viewMethod({
  //     contractId: CONTRACT, method: 'get_scores', args: {
  //       app_name: 'app1',
  //     }
  //   }).then(
  //     (scores) => {
  //       setArtists(Object.keys(scores).map((key) => createData(key, scores[key])));
  //     }
  //   );
  // }, [wallet]);

  useEffect(() => {
    setLoggedIn(!!signedAccountId);
  }, [signedAccountId]);

  const saveGreeting = () => {
    wallet.viewMethod({
      contractId: CONTRACT, method: 'get_scores', args: {
        app_name: 'app1',
      }
    }).then(
      (scores) => {
        setArtists(Object.keys(scores).map((key) => createData(key, scores[key])));
      }
    );
  };

  const [alignment, setAlignment] = useState('left');

  const handleAlignment = (
    event,
    newAlignment,
  ) => {
    setAlignment(newAlignment);
  };

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Interacting with the contract: &nbsp;
          <code className={styles.code}>{CONTRACT}</code>
        </p>
      </div>

      <div className={styles.center}>
        <h1 className="w-100">
          <ToggleButtonGroup
            value={alignment}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
          >
            <ToggleButton value="left" aria-label="left aligned">
              Rock
            </ToggleButton>
            <ToggleButton value="center" aria-label="centered">
              Paper
            </ToggleButton>
            <ToggleButton value="right" aria-label="right aligned">
              Scissors
            </ToggleButton>
          </ToggleButtonGroup>
          <Button variant="contained">Submit</Button>
        </h1>
        <div className="input-group" hidden={!loggedIn}>
          <input
            type="text"
            className="form-control w-20"
            placeholder="Store a new greeting"
            onChange={t => setNewGreeting(t.target.value)}
          />
          <div className="input-group-append">
            <button className="btn btn-secondary" onClick={saveGreeting}>
              <span hidden={showSpinner}> Update </span>
              <i
                className="spinner-border spinner-border-sm"
                hidden={!showSpinner}
              ></i>
            </button>
          </div>
        </div>
        <div className="w-100 text-end align-text-center" hidden={loggedIn}>
          <p className="m-0"> Please login to change the greeting </p>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {artists.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="right">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Cards />
    </main>
  );
}