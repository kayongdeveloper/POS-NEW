interface PaginatedResponseParams<T> {
  data: T[];             
  total: number;         
  page: number;          
  limit: number;        
  message?: string;      
}

export const sendPaginatedResponse = <T>({
  data,
  total,
  page,
  limit,
  message = "Data berhasil diambil", 
}: PaginatedResponseParams<T>) => {
  
  const totalPages = Math.ceil(total / limit);

  return {
    status: "success",
    message,
    meta: {
      total,
      page,
      limit,
      totalPages,
      nextPage: page < totalPages ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
    },
    data,
  };
};
