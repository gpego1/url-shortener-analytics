function UrlForm() {
    return (
        <>
        <form className="input-group">
            <label htmlFor="url-input" className="sr-only">URL: </label>
            <input 
             id="url-input"
             type="text" 
             placeholder="Paste the URL  here..."
              />
            <button type="submit" className="btn btn--primary btn--lg">
                Send
            </button> 
        </form>
        </>
    )
}
export default UrlForm