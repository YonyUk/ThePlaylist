export const fileNamer = (req: Express.Request, file: any, callback: Function ) => {
    if ( !file ) return callback(new Error('File is empty'),false);

    const fileExtension = file.originalname.split('.');
    const FileName = `${fileExtension[0]}.${fileExtension[1]}`;
    
    return callback(null,FileName);
}