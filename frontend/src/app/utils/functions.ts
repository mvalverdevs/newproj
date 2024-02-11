/**
   * 
   * @param base64str example: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA....
   * @returns Blob
   */
export function base64toBlob(base64str: string){
    const contentTypeParts = base64str.split(';');
    const contentType = contentTypeParts[0].split(':')[1];
    
    // Base64 string to bytes
    const byteCharacters = atob(base64str.split(',')[1]);
    const byteArrays = new Uint8Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteArrays[i] = byteCharacters.charCodeAt(i);
    }

    // Create blob
    return new Blob([byteArrays], { type: contentType });
  }