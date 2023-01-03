/****** Object:  StoredProcedure [dbo].[Booking_SelectAll]    Script Date: 1/2/2023 10:22:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Joshua Flores
-- Create date: 12/23/22
-- Description: Selects all Bookings
-- Code Reviewer: 

-- MODIFIED BY:
-- MODIFIED DATE: 
-- Code Reviewer:
-- Note: 
-- =============================================


ALTER PROC [dbo].[Booking_SelectAll]
			@PageIndex int
		   ,@PageSize int

AS


/*---- TEST CODE ----

	DECLARE @PageIndex int = 0
			,@PageSize int = 2

	EXECUTE dbo.Booking_SelectAll
			@PageIndex
			,@PageSize

---- END TEST CODE ----
*/


BEGIN

		DECLARE @Offset int = @PageIndex * @PageSize

		SELECT 
			B.Id
			,B.BookingTypeId
			,B.BookingRateTypeId
			,B.BookingDate
			,B.BookingStartTypeId
			,B.BookingEndTypeId
			,B.BookingStartTime
			,B.BookingEndTime
			,B.BookingAddressId
			,B.BookingContactId
			,B.StatusTypeId
			,B.DateCreated
			,B.DateModified
			,B.CreatedBy
			,B.ModifiedBy
			,TotalCount = COUNT(1) OVER()

		FROM dbo.Bookings as B

		ORDER BY B.Id
		OFFSET @OFFSET Rows
		Fetch Next @PageSize Rows ONLY

END
