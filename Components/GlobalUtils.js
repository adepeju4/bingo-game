import CircularProgress from "@mui/material/CircularProgress";

export function CircularLoader() {
    return (
        <div style={{ position: 'absolute', top: '0', left: '0', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100%', flexDirection: 'column'}}>
            <CircularProgress color="secondary" />
            <p style={{fontSize: '1rem', marginTop: '1rem', color: '#fff'}}>
                Please wait...
            </p>
      </div>
  );
}
export function ErrorDisplay({error}) {
    return (
        <div style={{ position: 'absolute', top: '0', left: '0', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100%', flexDirection: 'column'}}>
            <p style={{fontSize: '1rem', marginTop: '1rem', color: '#fff'}}>
                {error}
            </p>
            
      </div>
  );
}

